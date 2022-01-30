import { Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export function Heart() {
  const [isLiked, setIsLiked] = useState(true);

  return (
    <div onClick={() => setIsLiked((prev) => !prev)}>
      {" "}
      {isLiked ? (
        <Icon as={FaRegHeart} w={5} h={5} cursor={"pointer"} />
      ) : (
        <Icon as={FaHeart} w={5} h={5} cursor={"pointer"} color="red.500" />
      )}
    </div>
  );
}
