import {map, Observable, ReplaySubject, Subject } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Container, ProjectTableElement, Project} from "../models/container.interface";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {env} from "../../../../environments/environment";

@Injectable({ providedIn: "root"})
export class ContainerService {
  private projects: Project[] = [];
  private containers: Container[] = [];

  private activeContainerSubject: ReplaySubject<ProjectTableElement> = new ReplaySubject();

  constructor(public httpClient: HttpClient, public toastr: ToastrService) {
  }

  loadProjects(): Observable<Project[]> {
    return this.httpClient
      .get<{ p: Project[], c: Container[] }>(env.serverEndpoint + "projects", )
      .pipe(map(data => {
        this.projects = data.p;
        this.containers = data.c;
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

  setActiveContainer(container: ProjectTableElement) {
    this.activeContainerSubject.next(container);
  }

  activeContainer(): Subject<ProjectTableElement> {
    return this.activeContainerSubject;
  }

  build(id: string) {
    return this.httpClient.post(env.serverEndpoint + "build",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully built the container.");
    }));
  }

  create(id: string) {
    return this.httpClient.post(env.serverEndpoint + "create",  {
      id: id
    }).pipe(map(() => {
      this.toastr.success("Successfully created the container.");
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

  delete(id: string) {
    const url = env.serverEndpoint + `remove/${id}`;
    return this.httpClient.delete(url).pipe(map(() => {
      this.toastr.success("Successfully removed the container.");
    }));
  }

  getLogs(id: string) {
    const url = env.serverEndpoint + `logs/${id}`;
    return this.httpClient.get(url).pipe(map(() => {
      this.toastr.success("Showing logs.");
    }));
  }
}

