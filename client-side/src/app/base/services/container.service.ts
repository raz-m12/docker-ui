import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/envinronment";
import {Container, Project } from "../models/container.interface";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root"})
export class ContainerService {
  projects: Project[] = [];
  containers: Container[] = [];

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
}

