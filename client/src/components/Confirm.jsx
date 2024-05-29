import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <Modal isOpen={true} onOpenChange={onOpenChange} hideCloseButton={true}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
            <ModalBody>
              <p>Tài khoản đã hết phiên hoạt động, vui lòng đăng nhập lại!</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleLogout()}>
                Đăng nhập
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
