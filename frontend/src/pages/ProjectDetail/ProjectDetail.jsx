import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { showAllPost } = useContext(StoreContext);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (showAllPost) {
      const selectedProject = showAllPost.find(
        (p) => p.id == Number(projectId)
      );
      setProject(selectedProject);
    }
  }, [showAllPost, projectId]);

  if (!project) {
    return <div className="text-white">Loading...</div>;
  }

  const techStackArray = project.techStack
    ? project.techStack.split(",").map((tech) => tech.trim())
    : [];

  return (
    <div className="relative flex flex-col items-center dark:bg-zinc-900 text-white">
      <div className="md:w-[70%] w-[95%]">
        <div className="flex items-center gap-5 mb-2 mt-3">
          <h1 className="sm:text-3xl text-2xl sm:font-bold font-bold ">
            {project.title}
          </h1>
        </div>
        <div>
          <img src="/resume.png" alt="Coffee Webpage" />
        </div>
        <div className="flex gap-5 m">
          <p>likes</p>
          <p>comments</p>
        </div>
        <div className="mt-4">
          <h1 className="text-lg font-semibold">Project Description</h1>
          <p>{project.description}</p>
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Tech stack</h1>
            <ul className="sm:gap-8 gap-5 list-disc ml-6">
              {techStackArray.length > 0 ? (
                techStackArray.map((tech, index) => <li key={index}>{tech}</li>)
              ) : (
                <p>No tech stack available</p>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <h1 className="text-lg font-semibold">Project References</h1>
            <ul className="list-disc ml-6">
              <li>React.js doc</li>
              <li>JavaScript doc</li>
              <li>Tailwind CSS doc</li>
              <li>HTML5 & CSS3 doc</li>
            </ul>
          </div>

          {project.deployedLink && (
            <div className="mt-4">
              <h1 className="text-lg font-semibold">Visit Website</h1>
              <a
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                {project.deployedLink}
              </a>
            </div>
          )}

          {project.githubLink && (
            <div className="mt-4 pb-16">
              <h1 className="text-lg font-semibold">Visit GitHub Repository</h1>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                {project.githubLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;