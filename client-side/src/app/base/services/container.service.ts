import {first, map, Observable, of, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Container, ProjectTableElement, Project} from "../models/container.interface";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {env} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({ providedIn: "root"})
export class ContainerService {

  // Grid data
  private projects: Project[] | undefined = undefined;


  private _tableData!: ProjectTableElement[];

  // Used for changing the active project
  private activeContainerSubject: ReplaySubject<ProjectTableElement> = new ReplaySubject<ProjectTableElement>();

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public router: Router) {
    console.log("creating");
  }

  /**
   * Load all table data by providing cache data if available
   */
  loadProjectsWithCache(): Observable<ProjectTableElement[]> {
    if(this._tableData !== undefined)
      return of(this._tableData!);

    return this.httpClient
      .get<{ projects: Project[], containers: Container[] }>(env.serverEndpoint + "projects", )
      .pipe(map(data => {
        this.projects = data.projects;
        this._tableData = data.projects.map(this.getTableData(data.containers));
        return this._tableData!;
      }));
  }

  private getTableData(containers: Container[]): (p: Project) => ProjectTableElement {
    return (p: Project): ProjectTableElement => {
      return {
        name: p.id,
        path: p.path,
        yaml: p.yaml,
        status: this.isActive(p.id, containers),
        id: p.id
      }
    }
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
      this.loadProjectsWithCache().pipe(first()).subscribe(() => {
        resolve(this.existsProject(id));
      });
    });
  }
}

