import { useState, useCallback, useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface ProjectItem {
  title: string;
  category: string;
  tools: string;
  image: string;
  url?: string;
}

const staticProjects: ProjectItem[] = [
  {
    title: "Smart Agricultural Storage Monitoring",
    category: "IoT & Machine Learning",
    tools: "ESP32, C++, Python, Random Forest, Sensor Networks",
    image: "",
    url: "https://github.com/Enthusiastic-Tech",
  },
  {
    title: "Home Automation",
    category: "Embedded Systems",
    tools: "ESP32, C++, UART, Sensor Integration, Mobile App Control",
    image: "",
    url: "https://github.com/Enthusiastic-Tech",
  },
  {
    title: "Farming Marketplace",
    category: "Web Application",
    tools: "HTML, CSS, JavaScript (Direct Crop Sale)",
    image: "",
    url: "https://github.com/Enthusiastic-Tech",
  },
];

const Work = () => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(staticProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/Enthusiastic-Tech/repos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch GitHub repositories");
        return res.json();
      })
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const githubRepos = data
            .filter((repo) => !repo.fork)
            .map((repo) => ({
              title: repo.name
                .replace(/[-_]+/g, " ")
                .replace(/\b\w/g, (char: string) => char.toUpperCase())
                .trim(),
              category: repo.language || "Open Source Project",
              tools: repo.description || "A public repository on GitHub.",
              image: "",
              url: repo.html_url,
            }));

          if (githubRepos.length > 0) {
            // Keep the main static projects at the front, append unique GitHub projects
            const combined = [
              ...staticProjects,
              ...githubRepos.filter(
                (gr) =>
                  !staticProjects.some(
                    (sp) => sp.title.toLowerCase() === gr.title.toLowerCase()
                  )
              ),
            ];
            setProjectsList(combined);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching repositories:", err);
      });
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projectsList.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, projectsList.length]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projectsList.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, projectsList.length]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projectsList.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link-anchor"
                              data-cursor="disable"
                              style={{ color: "inherit", textDecoration: "none" }}
                            >
                              {project.title} <span className="project-link-icon">↗</span>
                            </a>
                          ) : (
                            project.title
                          )}
                        </h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projectsList.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
