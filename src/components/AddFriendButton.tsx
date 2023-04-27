"use client";

import { ButtonUI } from "@/components/ui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton = ({}: AddFriendButtonProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = useCallback(
    async (email: string) => {
      setIsLoading(true);
      try {
        const validatedEmail = addFriendValidator.parse({ email });

        await axios.post("/api/friends/add", {
          email: validatedEmail,
        });
        toast.success("Friend sent request");
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError("email", { message: error.message });
          return;
        }

        if (error instanceof AxiosError) {
          setError("email", { message: error?.response?.data });
          return;
        }

        setError("email", { message: "Something went wrong." });
      } finally {
        setIsLoading(false);
      }
    },
    [setError]
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      addFriend(data.email);
    },
    [addFriend]
  );

  return (
    <Box mt={2}>
      <Typography variant="h3" fontWeight="bold" mb={1}>
        Add a friend
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography mb={0.5}>Add friend by E-Mail</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <TextField
            {...register("email")}
            size="small"
            placeholder="you@example.com"
          />
          <ButtonUI type="submit" size="m">
            {`Add${isLoading ? "..." : ""}`}
          </ButtonUI>
        </Box>
        {errors?.email && (
          <Typography variant="caption" color={(theme) => theme.color.main}>
            {errors?.email.message}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default AddFriendButton;
