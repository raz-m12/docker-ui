import {first, map, Observable, of, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Container, ProjectTableElement, Project} from "../models/container.interface";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {env} from "../../../../config/environment";
import {Router} from "@angular/router";

@Injectable({ providedIn: "root"})
export class ContainerService {

  private _tableData!: ProjectTableElement[];
  private opPending = false;

  // Used for changing the active project
  private activeContainerSubject: ReplaySubject<ProjectTableElement> = new ReplaySubject<ProjectTableElement>();
  private needsRefresh = true;

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public router: Router) {
    console.log("creating");
  }

  setOperationPending(value: boolean) {
    this.opPending = value;
  }

  isOperationPending() {
    return this.opPending;
  }
  /**
   * Load all table data by providing cache data if available
   */
  loadProjectsWithCache(showNotification: boolean): Observable<ProjectTableElement[]> {
    if(!this.needsRefresh)
      return of(this._tableData!);

    return this.httpClient
      .get<{ projects: Project[], containers: Container[] }>(env.serverEndpoint + "projects", )
      .pipe(map(data => {
        if(showNotification)
          this.toastr.success("Projects loaded successfully");
        this.needsRefresh = false;
        this._tableData = data.projects.map(this.getTableData(data.containers));
        return this._tableData!;
      }));
  }

  private getTableData(containers: Container[]): (p: Project, i: number) => ProjectTableElement {
    return (p: Project, i: number): ProjectTableElement => {
      return {
        name: p.id,
        composeDir: p.composeDir,
        projectName: p.projectName,
        yaml: p.yaml,
        status: this.isActive(i, containers),
        id: p.id
      }
    }
  }

  /**
   * Checks status of the given project id
   * @param position of the project
   * @param containers active/passive containers fetched via docker-compose ps
   */
  private isActive(position: number, containers: Container[]) {
    return containers[position].out.indexOf("Up") >= 0;
  }
  /**
   * Broadcasts the container to all listeners
   * @param container
   */
  nextProject(container: ProjectTableElement) {
    this.activeContainerSubject.next(container);
  }

  /**
   * To subscribe to the active project as it changes
   */
  activeProject(): Subject<ProjectTableElement> {
    return this.activeContainerSubject;
  }

  /**
   * Navigate to the configuration page
   * @param selected to append as parameter
   */
  goToConfigPage(selected: ProjectTableElement) {
    this.router.navigate(['/dashboard/containers', selected.id]);
  }

  /**
   * Clear fetched projects, makes call to download them again
   */
  refreshProjects() {
    this.needsRefresh = true;
  }

  /**
   * Checks if a project id exists
   * @param id project to verify
   */
  existsProject(id: string) {
    const project = this._tableData?.find(p => p.id === id);
    const found = project !== undefined;
    if(found)
      this.nextProject(project);
    return found;
  }

  /**
   * Checks whether a project exists given project id
   * @param id project id
   */
  httpProjectExists(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      // Simulate an asynchronous authentication check
      this.loadProjectsWithCache(true).pipe(first()).subscribe(() => {
        resolve(this.existsProject(id));
      });
    });
  }
}

