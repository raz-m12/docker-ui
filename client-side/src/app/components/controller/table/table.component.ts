import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

export interface ContainerElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: ContainerElement[] = [
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
  dataToDisplay: ContainerElement[] = ELEMENT_DATA;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataStream: MatTableDataSource<ContainerElement>;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataStream = new MatTableDataSource(this.dataToDisplay);
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
      this.dataStream.data.forEach((dataItem, index) => {
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
