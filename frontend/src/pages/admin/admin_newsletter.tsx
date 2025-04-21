import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { postNewsletter } from "../../helpers/newsletter_service";
  import { NewsletterPostData } from "../../helpers/model";
  import useCustomToast from "../../hooks/useCustomToast";
  
  const AdminNewsletterForm = () => {
	const showToast = useCustomToast();
  
	const [formData, setFormData] = useState<NewsletterPostData>({
	  title: "",
	  description: "",
	  image: undefined,
	  pdf: undefined,
	});
  
	const [loading, setLoading] = useState(false);
  
	const handleInputChange = (
	  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
	  const { name, value } = e.target;
	  setFormData((prev) => ({ ...prev, [name]: value }));
	};
  
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	  const { name, files } = e.target;
	  if (files && files.length > 0) {
		setFormData((prev) => ({ ...prev, [name]: files[0] }));
	  }
	};
  
	const handleSubmit = async (e: React.FormEvent) => {
	  e.preventDefault();
	  if (
		!formData.title ||
		!formData.description ||
		!formData.image ||
		!formData.pdf
	  ) {
		showToast("Missing fields", "Please fill in all required fields.", "error");
		return;
	  }
  
	  setLoading(true);
	  try {
		await postNewsletter(formData);
		showToast("Success", "Newsletter created successfully!", "success");
		setFormData({
		  title: "",
		  description: "",
		  image: undefined,
		  pdf: undefined,
		});
	  } catch (error) {
		showToast("Error", "Failed to create newsletter.", "error");
	  } finally {
		setLoading(false);
	  }
	};
  
	return (
	  <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
		<form onSubmit={handleSubmit}>
		  <VStack spacing={5} align="stretch">
			<FormControl isRequired>
			  <FormLabel>Title</FormLabel>
			  <Input
				type="text"
				name="title"
				value={formData.title}
				onChange={handleInputChange}
				placeholder="Enter newsletter title"
			  />
			</FormControl>
  
			<FormControl isRequired>
			  <FormLabel>Description</FormLabel>
			  <Textarea
				name="description"
				value={formData.description}
				onChange={handleInputChange}
				placeholder="Enter newsletter description"
			  />
			</FormControl>
  
			<FormControl isRequired>
			  <FormLabel>Upload Image</FormLabel>
			  <Input
				type="file"
				name="image"
				accept="image/*"
				onChange={handleFileChange}
			  />
			</FormControl>
  
			<FormControl isRequired>
			  <FormLabel>Upload PDF</FormLabel>
			  <Input
				type="file"
				name="pdf"
				accept=".pdf"
				onChange={handleFileChange}
			  />
			</FormControl>
  
			<Button
			  colorScheme="teal"
			  type="submit"
			  isLoading={loading}
			  loadingText="Submitting"
			>
			  Submit Newsletter
			</Button>
		  </VStack>
		</form>
	  </Box>
	);
  };
  
  export default AdminNewsletterForm;
  