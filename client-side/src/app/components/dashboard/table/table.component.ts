import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {TableDialogComponent} from "../table-dialog/table-dialog.component";
import {ProjectTableElement} from "../../../base/models/container.interface"
import {ContainerService} from "../../../base/services/services";
import {Subject, takeUntil} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../base/services/operations.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnDestroy {
  // Grid variables
  displayedColumns: string[] = ['name','projectName', 'status', 'action', ];
  dataToDisplay: ProjectTableElement[] = [];
  dataStream: MatTableDataSource<ProjectTableElement>;
  selectedRowIndex = "";
  isLoading = true;
  iconClicked = false;
  loading = false;
  loadingRow: ProjectTableElement | null = null;


  // Pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Unsubscription
  private ngUnsubscribe = new Subject<void>();

  constructor(public dialog: MatDialog, public CS: ContainerService, public toastr: ToastrService,
              private cd: ChangeDetectorRef, private CM: OperationsService) {
    // Assign the data to the data source for the table to render
    this.dataStream = new MatTableDataSource(this.dataToDisplay);
  }

  /**
   * Refresh table
   */
  refresh(showNotification = true) {
    this.CS.refreshProjects();
    this.loadProjects(showNotification);
  }

  private loadProjects(showNotification = true) {
    this.CS.loadProjectsWithCache(showNotification).pipe(takeUntil(this.ngUnsubscribe)).subscribe((projects: ProjectTableElement[]) => {
      this.isLoading = false;
      this.cd.detectChanges();
      this.dataStream.data = projects;
    });
  }

  /**
   * Unsubscription
   */
  ngOnDestroy(): void {
    // unsubscribe to all observables.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Set up pagination and sorting
   */
  ngAfterViewInit() {
    this.dataStream.paginator = this.paginator;
    this.dataStream.sort = this.sort;
    this.loadProjects();
  }

  /**
   * Highlight a selected item
   * @param row that was selected
   */
  highlight(row: ProjectTableElement){
    if(this.iconClicked) {
      this.iconClicked = false;
      return;
    }
    if(row.id === this.selectedRowIndex)
      this.selectedRowIndex = "";
    else
      this.selectedRowIndex = row.id;
  }
  goto() {
    const selected = this.dataStream.data.find(c => c.id === this.selectedRowIndex)!;
    this.CS.nextProject(selected);
    this.CS.goToConfigPage(selected);
  }

  /**
   * Opens the modal used for deletion/creation
   * @param action Update, Delete, Add
   * @param obj potential selected item
   */
  openDialog(action: string, obj: ProjectTableElement | null) {
    this.iconClicked = true;
    let newElem = null;
    if(obj != null)
      obj.action = action;
    else {
        newElem = { action: action };
      }

    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '600px',
      data: obj ? obj: newElem
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

  showLoading(row: ProjectTableElement) {
    return row.id === this.loadingRow?.id;
  }
  /**
   * Convenient function for removing an image.
   * @param row the clicked element
   */
  composeDown(row: ProjectTableElement) {
    this.loadingRow = row;
    this.setLoading(true);
    this.CM.composeDown(row.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.setLoading(false);
      this.refresh(false);
    });
  }

  /**
   * Convenient function for loading and running an image.
   * @param row the clicked element
   */
  composeUp(row: ProjectTableElement) {
    this.loadingRow = row;
    this.setLoading(true);
    this.CM.composeUp(row.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.setLoading(false);
      this.refresh(false);
    });
  }

  /**
   * Update an existing item
   * @param item which was selected
   * @deprecated
   */
  update(item: ProjectTableElement){
    this.dataStream.data.forEach((value)=>{
      if(value.id == item.id){
        value.name = item.name;
      }
    });
  }

  /**
   * Add an item
   * @param item which was created
   * @deprecated
   */
  add(item: ProjectTableElement) {
    this.dataToDisplay = [...this.dataStream.data, item];
    this.dataStream.data = this.dataToDisplay;
  }

  /**
   * Deletion of a project
   * @param item which was selected
   * @deprecated
   */
  delete(item: ProjectTableElement) {
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

  /**
   * Apply filters
   * @param event contains search text
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStream.filter = filterValue.trim().toLowerCase();

    if (this.dataStream.paginator) {
      this.dataStream.paginator.firstPage();
    }
  }

  setLoading(yes: boolean) {
    if(!yes) {
      this.loadingRow = null;
    }
    this.loading = yes;
    this.iconClicked = yes;
  }
}
