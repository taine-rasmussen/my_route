import { createContext, useContext, useState } from 'react';

interface ProjectFilters {
  showOpenProjects: boolean;
  showClosedProjects: boolean;
}

interface ProjectsContextType {
  projectFilters: ProjectFilters;
  setProjectFilters: any;
}

const INIT_STATE = {
  showOpenProjects: true,
  showClosedProjects: true,
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projectFilters, setProjectFilters] =
    useState<ProjectFilters>(INIT_STATE);

  return (
    <ProjectsContext.Provider value={{ projectFilters, setProjectFilters }}>
      {children}
    </ProjectsContext.Provider>
  );
};
