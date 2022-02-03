import { Icon } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Props = {
  voted: boolean;
  onClick?(): void;
};

export function Heart({ voted, onClick }: Props) {
  return (
    <div onClick={onClick}>
      <Icon
        as={voted ? FaHeart : FaRegHeart}
        w={5}
        h={5}
        cursor={"pointer"}
        color="red.500"
      />
    </div>
  );
}
