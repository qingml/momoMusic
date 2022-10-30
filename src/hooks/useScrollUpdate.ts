import { onMounted, onUnmounted } from "vue";

export interface UseScrollProps {
  handleScollUpdate(): void;
}

const useScrollUpdate = (props: UseScrollProps) => {
  const handleScollToBottom = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight -1) {
      props.handleScollUpdate();
    }
  };

  onMounted(() => {
    window.document.addEventListener("scroll", handleScollToBottom);
  });

  onUnmounted(() => {
    window.document.removeEventListener("scroll", handleScollToBottom);
  });
};

export default useScrollUpdate;
