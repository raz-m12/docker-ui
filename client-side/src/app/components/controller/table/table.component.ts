import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {TableDialogComponent} from "../table-dialog/table-dialog.component";
import {ContainerTableElement, Project} from "../../../base/models/container.interface"
import { ContainerService } from "../../../base/services/services";
import {ToastrService} from "ngx-toastr";

const ELEMENT_DATA: ContainerTableElement[] = [
  {id: "1", name: 'Hydrogen', status: false, path: ""},
  {id: "2", name: 'Helium', status: false, path: ""},
  {id: "3", name: 'Lithium', status: false, path: ""},
  {id: "4", name: 'Beryllium', status: true, path: ""},
  {id: "5", name: 'Boron', status: true, path: ""},
  {id: "6", name: 'Carbon', status: true, path: ""},
  {id: "7", name: 'Nitrogen', status: false, path: ""},
  {id: "8", name: 'Oxygen', status: false, path: ""},
  {id: "9", name: 'Fluorine', status: true, path: ""},
  {id: "10", name: 'Neon', status: true, path: ""},
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'status', 'action'];
  dataToDisplay: ContainerTableElement[] = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataStream: MatTableDataSource<ContainerTableElement>;
  selectedRowIndex = "";

  constructor(public dialog: MatDialog, public CS: ContainerService, public toast: ToastrService) {
    // Assign the data to the data source for the table to render
    this.dataStream = new MatTableDataSource(this.dataToDisplay);
  }

  ngOnInit(): void {
    this.CS.loadProjects().subscribe((projects: Project[]) => {
      const data: ContainerTableElement[] = projects.map((p): ContainerTableElement => {
        return {
          name: p.id,
          path: p.path,
          yaml: p.yaml,
          status: this.CS.isActive(p.id),
          id: p.id
        }
      });
      this.dataStream.data = [...data];
    });
  }

  ngAfterViewInit() {
    this.dataStream.paginator = this.paginator;
    this.dataStream.sort = this.sort;
  }

  highlight(row: ContainerTableElement){
    if(row.id === this.selectedRowIndex)
      this.selectedRowIndex = "";
    else
      this.selectedRowIndex = row.id;

    this.CS.setActiveContainer(this.dataStream.data.find(c => c.id === this.selectedRowIndex));
  }


  openDialog(action: string, obj: ContainerTableElement | null) {
    if(obj != null)
      obj.action = action;
    else { // @ts-ignore
        obj = {}; obj.action = action;
      }

    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '600px',
      data: obj ? obj: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.add(result.data);
      }else if(result.event == 'Update'){
        this.update(result.data);
      }else if(result.event == 'Delete'){
        this.delete(result.data);
      }
    });
  }

  update(item: ContainerTableElement){
    this.dataStream.data.forEach((value)=>{
      if(value.id == item.id){
        value.name = item.name;
      }
    });
  }

  add(item: ContainerTableElement) {
    this.dataToDisplay = [...this.dataStream.data, item];
    this.dataStream.data = this.dataToDisplay;
  }

  delete(item: ContainerTableElement) {
    const originalIndex = this.dataStream.data.findIndex(
      (dataItem) => dataItem.id === item.id
    );

    if (originalIndex >= 0) {
      // Delete item from the original data array
      this.dataStream.data.splice(originalIndex, 1);

      // Update the data source to reflect the change
      this.dataStream.data = [...this.dataStream.data];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStream.filter = filterValue.trim().toLowerCase();

    if (this.dataStream.paginator) {
      this.dataStream.paginator.firstPage();
    }
  }
}
