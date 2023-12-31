"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { CommentValidation } from "@/lib/validations/tweet";
import * as z from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToTweet } from "@/lib/actions/tweet.actions";

type CommentProps = {
  tweetId: string;
  currentUserImg: string;
  currentUserId: string;
  buttonTitle: string;
};

export default function Comment({
  tweetId,
  currentUserImg,
  currentUserId,
  buttonTitle,
}: CommentProps) {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      tweet: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    await addCommentToTweet(
      tweetId,
      values.tweet,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  }

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Post your reply!"
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          {buttonTitle}
        </Button>
      </form>
    </Form>
  );
}
