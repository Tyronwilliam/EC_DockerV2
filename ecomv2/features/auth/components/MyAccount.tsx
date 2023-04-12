import { Dialog, Formulaire } from "@/features/common";
import Box from "@/features/common/components/Box";
import React from "react";

function MyAccount() {
  return (
    <Dialog>
      <Box myStyle="form">
        <Formulaire
          isPassword={false}
          isEmailReadOnly={true}
          title="informations personnel"
          isEditable={true}
          isCgv={false}
        />
      </Box>
    </Dialog>
  );
}

export default MyAccount;
