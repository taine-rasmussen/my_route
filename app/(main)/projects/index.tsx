import React from 'react';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Header from './Header';
import { ProjectProvider } from '@/app/contexts/ProjectsContext';

const Projects = () => {
  return (
    <ProjectProvider>
      <SafeAreaWrapper>
        <Header />
      </SafeAreaWrapper>
    </ProjectProvider>
  );
};

export default Projects;
