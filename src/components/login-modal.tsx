"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  FieldLabel,
  Heading,
  Input,
  Modal,
  ModalFooterNote,
  OrRule,
  Stack,
  Text,
} from "@/components/ui";
import { GoogleIcon } from "./icons";
import { useLogin } from "./login-context";

export function LoginModal() {
  const { open, setOpen, signIn } = useLogin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [googleError, setGoogleError] = useState(false);

  useEffect(() => {
    if (open) return;
    setGoogleError(false);
  }, [open]);

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <Modal onClose={close} footer={<ModalFooterNote>Secured by Clerk</ModalFooterNote>}>
      <Stack gap="section">
        <Stack gap="tight">
          <Heading as="h2" variant="section" align="center">
            Sign in to Matcha
          </Heading>
          <Text tone="subtle" align="center">
            Welcome back! Please sign in to continue
          </Text>
        </Stack>
        <Stack gap="tight">
          <Button variant="outline" block onClick={() => setGoogleError(true)}>
            <GoogleIcon />
            Continue with Google
          </Button>
          {googleError ? (
            <Text size="caption" tone="subtle" align="center">
              Google sign-in is not available in this demo.
            </Text>
          ) : null}
        </Stack>
        <OrRule />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const next = email.trim();
            if (next) {
              signIn(next);
              router.push("/preferences");
            }
          }}
        >
          <Stack gap="cluster">
            <FieldLabel>Email address</FieldLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
            <Button type="submit" variant="brand" block>
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}
