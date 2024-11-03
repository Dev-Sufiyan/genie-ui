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
  onConfirm: (id: string, amount: string) => Promise<boolean>; // Simulated API call
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

  const handleConfirm = async () => {
    setLoading(true);
    // Simulating an API call with a delay
    const result = await onConfirm(id, amount);
    setSuccess(result);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onClose}>
      <div style={{ padding: 20 }}>
        <Text variant="xLarge">Please Confirm Details :</Text>
        <div>
          <Text>ID: {id}</Text>
          <Text>Amount: {amount}</Text>
        </div>

        <Stack
          horizontal
          tokens={{ childrenGap: 10 }}
          style={{ marginTop: 20 }}
        >
          <PrimaryButton onClick={handleConfirm} disabled={loading}>
            {loading ? "Processing..." : "Confirm"}
          </PrimaryButton>
          <DefaultButton onClick={onClose}>Cancel</DefaultButton>
        </Stack>

        <div className="centerdiv">
          {success !== null && (
            <Stack tokens={{ childrenGap: 5 }} style={{ marginTop: 20 }}>
              {success ? (
                <>
                  <CheckmarkCircle48Filled style={{ color: "green" }} />
                  <Text variant="medium">
                    Success! Your transaction has been completed.
                  </Text>
                </>
              ) : (
                <>
                  <ErrorCircle48Filled style={{ color: "red" }} />
                  <Text variant="medium">
                    Failed! There was an issue with the transaction.
                  </Text>
                </>
              )}
            </Stack>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDtPopup;
