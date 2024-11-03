import React from "react";
import {
  Modal,
  Stack,
  Text,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import {
  CheckmarkCircle48Filled,
  ErrorCircle48Filled,
} from "@fluentui/react-icons";

interface ConfirmDtPopupProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  amount: string;
  onConfirm: (id: string, amount: string) => Promise<boolean>;
}

const ConfirmDtPopup: React.FC<ConfirmDtPopupProps> = ({
  isOpen,
  onClose,
  id,
  amount,
  onConfirm,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean | null>(null);
  const [transactionId, setTransactionId] = React.useState<string | null>(null);

  // Reset the state when the modal is closed
  const handleClose = () => {
    setSuccess(null);
    setTransactionId(null);
    setLoading(false);  // Ensure loading is also reset
    onClose();
  };

  const handleConfirm = async () => {
    setLoading(true);
    const result = await onConfirm(id, amount);
    if (result) {
      setTransactionId(id);  // Store transaction ID
    }
    setSuccess(result);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onDismiss={handleClose}>
      <div style={{ padding: 20 }}>
        <Text variant="xLarge">Please Confirm Details:</Text>
        <div>
          <Text variant="large">ID: {id}</Text>
        </div>
        <div>
          <Text variant="large">Amount: {amount}</Text>
        </div>

        <Stack
          horizontal
          tokens={{ childrenGap: 10 }}
          style={{ marginTop: 20 }}
        >
          <PrimaryButton
            onClick={handleConfirm}
            disabled={loading || success !== null}
          >
            {loading ? "Processing..." : "Confirm"}
          </PrimaryButton>
          <DefaultButton onClick={handleClose}>
            {success !== null ? "Close" : "Cancel"}
          </DefaultButton>
        </Stack>

        {success !== null && (
          <Stack
            horizontalAlign="center"
            tokens={{ childrenGap: 10 }}
            style={{ marginTop: 20 }}
          >
            {success ? (
              <>
                <CheckmarkCircle48Filled style={{ color: "green" }} />
                <Text
                  variant="medium"
                  styles={{ root: { whiteSpace: "normal", wordWrap: "break-word" } }}
                >
                  Success! Your transaction with ID {transactionId} has been completed.
                </Text>
              </>
            ) : (
              <>
                <ErrorCircle48Filled style={{ color: "red" }} />
                <Text
                  variant="medium"
                  styles={{ root: { whiteSpace: "normal", wordWrap: "break-word" } }}
                >
                  Failed! There was an issue with the transaction.
                </Text>
              </>
            )}
          </Stack>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmDtPopup;
