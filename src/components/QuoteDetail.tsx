import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CustomModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Dialog open={isOpen} modal onOpenChange={onClose}>
      <DialogContent
        className="max-h-[98vh] p-0"
        style={{
          maxWidth: "min(96vw, 1480px)",
        }}
      >
        <ScrollArea className="h-[95vh] w-full">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
