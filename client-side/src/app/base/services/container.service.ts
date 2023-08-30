import {map, Observable, of, ReplaySubject, Subject} from "rxjs";
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
    return this.httpClient.post(env.serverEndpoint + "build",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully built the container.");
    }));
  }

  kill(id: string) {
    return this.httpClient.post(env.serverEndpoint + "kill",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully killed the container.");
    }));
  }

  start(id: string) {
    return this.httpClient.post(env.serverEndpoint + "start",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully started the container.");
    }));
  }


  stop(id: string) {
    return this.httpClient.post(env.serverEndpoint + "stop",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully stopped the container.");
    }));
  }

  restart(id: string) {
    return this.httpClient.post(env.serverEndpoint + "restart",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully restarted the container.");
    }));
  }

  composeUp(id: string) {
    return this.httpClient.post(env.serverEndpoint + "composeUp",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Composed up successfully.");
    }));
  }

  composeDown(id: string) {
    return this.httpClient.post(env.serverEndpoint + "composeDown",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Composed down successfully.");
    }));
  }

  goToConfigPage(selected: ProjectTableElement) {
    this.router.navigate(['dashboard', selected.id]);
  }
}

