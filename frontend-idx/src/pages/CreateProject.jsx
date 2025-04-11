import { Button, Col, Flex, Row } from "antd";
import { useCreteProject } from "../hooks/apis/mutations/useCreateProject";

const CreateProject = () => {

  const { createProjectMutation } = useCreteProject();

  async function handleCreateProject() {
    console.log("Going to trigger the api");
    try {
      await createProjectMutation();
      console.log("Now we should redirect the editor");
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
