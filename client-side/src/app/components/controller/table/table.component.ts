import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

export interface ContainerElement {
  name: string;
  id: number;
  status: boolean;
  remove: string;
}

const ELEMENT_DATA: ContainerElement[] = [
  {id: 1, name: 'Hydrogen', status: false, remove: 'H'},
  {id: 2, name: 'Helium', status: false, remove: 'He'},
  {id: 3, name: 'Lithium', status: false, remove: 'Li'},
  {id: 4, name: 'Beryllium', status: true, remove: 'Be'},
  {id: 5, name: 'Boron', status: true, remove: 'B'},
  {id: 6, name: 'Carbon', status: true, remove: 'C'},
  {id: 7, name: 'Nitrogen', status: false, remove: 'N'},
  {id: 8, name: 'Oxygen', status: false, remove: 'O'},
  {id: 9, name: 'Fluorine', status: true, remove: 'F'},
  {id: 10, name: 'Neon', status: true, remove: 'Ne'},
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'remove'];
  dataToDisplay: ContainerElement[] = ELEMENT_DATA;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataStream: MatTableDataSource<ContainerElement>;
  selectedRowIndex = -1;

  constructor() {
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


  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataStream.data, ELEMENT_DATA[randomElementIndex]];
    this.dataStream.data = this.dataToDisplay;
  }

  removeData(item: ContainerElement) {
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

      // Remove item from the original data array
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
