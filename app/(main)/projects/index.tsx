import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Header from './Header';
import { ProjectProvider } from '@/app/contexts/ProjectsContext';
import ProjectsList from './ProjectsList';

const Projects = () => {
  return (
    <ProjectProvider>
      <SafeAreaWrapper>
        <Header />
        <ProjectsList />
      </SafeAreaWrapper>
    </ProjectProvider>
  );
};

export default Projects;
