import {map, Observable, of, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Container, ProjectTableElement, Project, ContainerResult} from "../models/container.interface";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {env} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({ providedIn: "root"})
export class ContainerService {
  // Grid data
  private projects: Project[] | undefined = undefined;
  private containers: Container[] = [];

  // Used for changing the active project
  private activeContainerSubject: ReplaySubject<ProjectTableElement> = new ReplaySubject();

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public router: Router) {
  }

  /**
   * Load all table data by providing cache data if available
   */
  loadProjectsWithCache(): Observable<Project[]> {
    if(this.projects !== undefined)
      return of(this.projects!);

    return this.httpClient
      .get<{ projects: Project[], containers: Container[] }>(env.serverEndpoint + "projects", )
      .pipe(map(data => {
        this.projects = data.projects;
        this.containers = data.containers;
        return this.projects;
      }));
  }

  isActive(id: string) {
    return this.containers.filter(c => {
      return c.out.indexOf(id) >= 0
    }).some(obj => obj.data.services.some(s => {
      return s.state == "Up";
    }));
  }

  setProject(container: ProjectTableElement) {
    this.activeContainerSubject.next(container);
  }

  activeProject(): Subject<ProjectTableElement> {
    return this.activeContainerSubject;
  }

  build(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "build",  {
      id: id
    }).pipe(map((data) => {
      if(data.success)
        this.toastr.success("Successfully built the container");
      else
        this.toastr.error("Build process failed");
    }));
  }

  kill(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "kill",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully killed the container");
        this.refreshProjects();
      }
      else
        this.toastr.success("Kill command failed");
    }));
  }

  start(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "start",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully started all container");
        this.refreshProjects();
      }
      else
        this.toastr.error("Failed to start some container");
    }));
  }


  stop(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "stop",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully stopped all containers");
        this.refreshProjects();
      }
      else
        this.toastr.success("Failed to stop some container");
    }));
  }

  restart(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "restart",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully restarted the container");
        this.refreshProjects();
      }
      else
        this.toastr.error("Failed to restart some container");
    }));
  }

  composeUp(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "composeUp",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Composed up successfully");
        this.refreshProjects();
      }
      else
        this.toastr.error("Composed up failed");
    }));
  }

  composeDown(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "composeDown",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Compose down was successful");
        this.refreshProjects();
      }
      else
        this.toastr.error("Compose down failed");
    }));
  }

  getLogs(id: string) {
    return this.httpClient.get<ContainerResult>(env.serverEndpoint + `logs/${id}`)
      .pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Get logs was successful");
      }
      else
        this.toastr.error("Failure while getting logs");
    }));
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
}

