import { Col } from 'react-bootstrap';

interface ProjectCardProps{
    title: string;
    description: string;
    imgUrl: string;
}

const ProjectCard = ({ title, description, imgUrl }: ProjectCardProps) => {
    return (
        <Col size={12} sm={6} md={4}>
            <div className="proj-imgbx">
                <img src={imgUrl} alt="Image" />
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                </div>
            </div>
        </Col>
  )
}

export default ProjectCard