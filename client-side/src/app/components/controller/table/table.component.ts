import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {TableDialogComponent} from "../table-dialog/table-dialog.component";
import {ContainerElement} from "../../../base/models/container.interface"

const ELEMENT_DATA: ContainerElement[] = [
  {id: 1, name: 'Hydrogen', status: false},
  {id: 2, name: 'Helium', status: false},
  {id: 3, name: 'Lithium', status: false},
  {id: 4, name: 'Beryllium', status: true},
  {id: 5, name: 'Boron', status: true},
  {id: 6, name: 'Carbon', status: true},
  {id: 7, name: 'Nitrogen', status: false},
  {id: 8, name: 'Oxygen', status: false},
  {id: 9, name: 'Fluorine', status: true},
  {id: 10, name: 'Neon', status: true},
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'action'];
  dataToDisplay: ContainerElement[] = ELEMENT_DATA;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataStream: MatTableDataSource<ContainerElement>;
  selectedRowIndex = -1;

  constructor(public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataStream = new MatTableDataSource(this.dataToDisplay);
  }

  highlight(row: ContainerElement){
    this.selectedRowIndex = row.id;
  }

  ngAfterViewInit() {
    this.dataStream.paginator = this.paginator;
    this.dataStream.sort = this.sort;
  }


  openDialog(action: string, obj: ContainerElement | null) {
    if(obj != null)
      obj.action = action;
    else { // @ts-ignore
        obj = {}; obj.action = action;
      }

    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '400px',
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

  update(item: ContainerElement){
    this.dataStream.data.forEach((value,key)=>{
      if(value.id == item.id){
        value.name = item.name;
      }
    });
  }

  add(item: ContainerElement) {
    this.dataToDisplay = [...this.dataStream.data, item];
    this.dataStream.data = this.dataToDisplay;
  }

  delete(item: ContainerElement) {
    const originalIndex = this.dataStream.data.findIndex(
      (dataItem) => dataItem.id === item.id
    );

    if (originalIndex >= 0) {
      // Update the sorting indices
      this.dataStream.data.forEach((dataItem) => {
        if (dataItem.id !== item.id && dataItem.id > originalIndex) {
          dataItem.id--;
        }
      });

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
