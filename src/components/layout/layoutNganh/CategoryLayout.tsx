import { FormWrapper } from "@/components/FormWrapper";

interface RegistrationSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
}
export const RegistrationSection = ({
  title,
  description,
  backgroundImage
}: RegistrationSectionProps) => {
  return (
    <div
      className="relative bg-cover bg-center  flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage || "/assets/2.webp"})`
      }}
    >
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg md:w-1/2">
          <h2 className="text-2xl font-bold text-blue-800">{title}</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-line">
            {description}
          </p>
        </div>
        <div className="bg-[#1657A7] text-white p-6 rounded-lg shadow-lg md:w-1/2 md:ml-8 mt-6 md:mt-0">
          <h2 className="text-xl font-bold text-center pb-2">
            ĐĂNG KÝ NHẬN TƯ VẤN MIỄN PHÍ
          </h2>
          <FormWrapper type="form-main" />
        </div>
      </div>
    </div>
  );
};
