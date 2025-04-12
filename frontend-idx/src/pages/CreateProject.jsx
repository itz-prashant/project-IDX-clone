import { Button, Col, Flex, Row } from "antd";
import { useCreteProject } from "../hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const { createProjectMutation } = useCreteProject();

  const navigate = useNavigate();

  async function handleCreateProject() {
    console.log("Going to trigger the api");
    try {
      const response = await createProjectMutation();
      console.log("Now we should redirect the editor");
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.log("Error creating project", error);
    }
  }

  return (
    <Row>
      <Col span={24}>
        <Flex justify="center" align="center">
          <Button type="default" onClick={handleCreateProject}>
            Create Playground
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default CreateProject;
