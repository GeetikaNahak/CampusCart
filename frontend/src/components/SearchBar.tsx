import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Search query is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  searchQuery?: string;
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({ searchQuery: "" });
    onReset?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-4 justify-between border-2 rounded-lg px-4 py-3 shadow-sm transition-colors duration-200 ${
          form.formState.errors.searchQuery
            ? "border-red-500"
            : "border-gray-300"
        }`}
      >
        <Search
          strokeWidth={2}
          size={24}
          className="text-blue-600 hidden md:block"
        />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="w-full px-3 py-2 text-sm rounded-md border-none outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="rounded-full text-sm border-gray-300 hover:border-gray-500"
        >
          Reset
        </Button>

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
