import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-lg w-full text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-10 border border-gray-200">
        <div className="text-[96px] font-extrabold text-gray-200 leading-none mb-4">
          404
        </div>

        <Title level={2} className="mb-2! text-gray-800">
          Page Not Found
        </Title>

        <Text className="text-gray-500 text-base">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </Text>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="rounded-lg"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
