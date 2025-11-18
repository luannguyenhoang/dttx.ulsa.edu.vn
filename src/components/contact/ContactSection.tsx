import Link from "next/link";
import { FormWrapper } from "../FormWrapper";
import { HomeIcon } from "lucide-react";

export const ContactSection = (list: any) => {
  return (
    <>
      <div
        className="h-[300px] flex items-center justify-center relative bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/assets/Group-128.png')"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative flex flex-col items-center text-center z-10">
          <h1 className="text-4xl font-bold uppercase">Liên hệ</h1>
          <Link
            href="/"
            className="flex items-center space-x-2 mt-2 text-lg font-medium hover:opacity-80"
          >
            <HomeIcon className="w-6 h-6" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>
      <div className=" container max-w-7xl mx-auto flex flex-col lg:flex-row justify-center  py-20 ">
        <div className="w-full lg:w-1/2 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.704768661847!2d105.78247731535447!3d21.00667538601025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab48c90be42f%3A0x2ef1d8cf9db8df76!2zMTE2IFRy4bqnbiBW4bu5LCBNYWkgRMOsY2gsIEPhuqd1IEdpw6F5LCBIw6AgTuG7mWk!5e0!3m2!1sen!2s!4v1707100000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>

        <div className="w-full lg:w-1/2 pl-12 flex flex-col space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-blue-900">
              {" "}
              {list?.list?.title || ".Địa chỉ"}
            </h2>
            <p className="mt-2 text-[25px] text-[#000]">
              <strong>
                {list?.list?.label_1 || ".Văn phòng tiếp nhận hồ sơ"}
              </strong>
            </p>
            <ul className="mt-2 list-disc pl-4 text-gray-700">
              <li>
                <strong>
                  {list?.list?.label_2 ||
                    ".Miền Bắc: 116 Trần Vỹ - Mai Dịch - Cầu Giấy - HN"}
                </strong>{" "}
              </li>
              <li>
                <strong>
                  {list?.list?.label_3 ||
                    ".Miền Nam: 91 Ký Con - P. Nguyễn Thái Bình - Q.1 - Tp. HCM"}
                </strong>{" "}
              </li>
            </ul>
          </div>
          <FormWrapper type="form-main" />
        </div>
      </div>
    </>
  );
};
