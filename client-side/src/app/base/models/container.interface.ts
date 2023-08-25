export interface ContainerTableElement {
  id: string;
  name: string;
  status: boolean;
  action?: string;
  path: string;
  yaml?: string;
}

export interface Container {
  Labels: Labels;
  State: string;
}

interface Labels {
  "com.docker.compose.project": string;
}

export interface Project {
  id: string;
  path: string;
  yaml: string;
}

export interface Projects {
  projects: Project[];
  containers: Container[];
}
