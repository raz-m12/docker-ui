import {map, Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Container, ContainerTableElement, Project} from "../models/container.interface";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root"})
export class ContainerService {
  private projects: Project[] = [];
  private containers: Container[] = [];

  private activeContainerSubject: ReplaySubject<ContainerTableElement | undefined> = new ReplaySubject();

  constructor(public httpClient: HttpClient) {
  }

  loadProjects(): Observable<Project[]> {
    return this.httpClient
      .get(environment.serverEndpoint + "container/projects")
      .pipe(map((data: any) => {
        this.projects = data.projects;
        this.containers = data.containers;
        return this.projects;
      }));
  }

  isActive(id: string) {
    return this.containers.some(obj => obj.Labels.hasOwnProperty("com.docker.compose.project")
      && obj.Labels["com.docker.compose.project"] === id && obj.State === "running");
  }

  setActiveContainer(container: ContainerTableElement | undefined) {
    this.activeContainerSubject.next(container);
  }

  activeContainer(): Subject<ContainerTableElement | undefined> {
    return this.activeContainerSubject;
  }
}

