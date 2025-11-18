import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedTextProps {
  text: string[]; // Mảng các chuỗi cần hiển thị theo thứ tự
  className?: string; // Lớp CSS tùy chỉnh
  highlightIndex?: number; // Vị trí từ cần highlight (nếu có)
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  highlightIndex
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.h1
      ref={ref}
      className={`leading-tight ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3 // Hiệu ứng xuất hiện từng phần tử
          }
        }
      }}
    >
      {text.map((word, index) => (
        <motion.span
          key={index}
          className={`block ${
            index === highlightIndex ? "text-[#543cdf] font-bold" : ""
          }`}
          initial={{
            opacity: 0,
            x: -30,
            y: 20,
            rotate: -10 // Xoay nhẹ về một góc
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0 // Quay về vị trí ban đầu
                }
              : {
                  opacity: 0,
                  x: -30,
                  y: 20,
                  rotate: -10
                }
          }
          transition={{
            duration: 0.7,
            delay: index * 0.2,
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedText;
