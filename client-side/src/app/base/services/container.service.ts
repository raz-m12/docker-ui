import {BehaviorSubject, map, Observable, of, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Container, ProjectTableElement, Project, ContainerResult} from "../models/container.interface";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {env} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({ providedIn: "root"})
export class ContainerService {
  get tableData(): ProjectTableElement[] | undefined {
    return this._tableData;
  }

  set tableData(value: ProjectTableElement[] | undefined) {
    this._tableData = value;
  }
  // Grid data
  private projects: Project[] | undefined = undefined;
  private _tableData: ProjectTableElement[] | undefined;

  // Used for changing the active project
  private activeContainerSubject: ReplaySubject<ProjectTableElement> = new ReplaySubject<ProjectTableElement>();

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public router: Router) {
  }

  /**
   * Load all table data by providing cache data if available
   */
  loadProjectsWithCache(): Observable<ProjectTableElement[]> {
    if(this.tableData !== undefined)
      return of(this.tableData!);

    return this.httpClient
      .get<{ projects: Project[], containers: Container[] }>(env.serverEndpoint + "projects", )
      .pipe(map(data => {
        this.projects = data.projects;
        this.tableData = data.projects.map((p): ProjectTableElement => {
          return {
            name: p.id,
            path: p.path,
            yaml: p.yaml,
            status: this.isActive(p.id, data.containers),
            id: p.id
          }
        });
        return this.tableData!;
      }));
  }

  /**
   * Checks status of the given project id
   * @param id of the project
   * @param containers active/passive containers fetched via docker-compose ps
   */
  private isActive(id: string, containers: Container[]) {
    return containers.filter(c => {
      return c.out.indexOf(id) >= 0
    }).some(obj => obj.data.services.some(s => {
      return s.state == "Up";
    }));
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

  goToConfigPage(selected: ProjectTableElement) {
    this.router.navigate(['dashboard', selected.id]);
  }

  /**
   * Clear fetched projects, makes call to download them again
   */
  refreshProjects() {
    this.projects = undefined;
  }

  existsProject(id: string) {
    const project = this.tableData?.find(p => p.id === id);
    this.nextProject(project!);
    return project !== undefined;
  }
}

