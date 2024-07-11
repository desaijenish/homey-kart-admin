import styled from "@emotion/styled";
import {
  Autocomplete,
  Button,
  Chip,
  FormHelperText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useUploadDocumentMutation } from "../../../redux/api/document";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Please input the product name"),
  description: Yup.string().required("Please input the product description"),
  discount_text: Yup.string().required("Please input the discount text"),
  discount: Yup.number().required("Please input the discount").min(0),
  slide_image: Yup.string().required("Slide image is required"),
  slide: Yup.boolean().required("Please select if the product should slide"),
  category: Yup.string().required("Please input the category"),
  price: Yup.number().required("Please input the price").min(0),
  rates: Yup.number().required("Please input the rates").min(0).max(5),
  front_image: Yup.string().required("Front image is required"),
  review: Yup.string().required("Review is required"),
  images: Yup.array()
    .of(Yup.string().required("Image ID is required"))
    .min(1, "Please upload at least one image")
    .max(5, "You can upload a maximum of 5 images"),
});

const RootContainer = styled.div({
  top: "50%",
  left: "50%",
  position: "absolute",
  transform: "translate(-50% , -50%)",
});

const Container = styled.div({
  borderRadius: 30,
  background: "#ffffff",
  boxShadow: "15px 15px 100px #929292,-15px -15px 100px #ffffff",
  padding: 40,
  display: "flex",
  gap: 15,
  flexDirection: "column",
});

const InputContainer = styled.div({
  display: "flex",
  gap: 15,
  flexDirection: "column",
});

const VisuallyHiddenInput = styled.input({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductForm = () => {
  const [state, setState] = useState<any>({
    name: "",
    description: "",
    discount_text: "",
    discount: 0,
    slide_image: null,
    slide: true,
    category: "",
    price: 0,
    rates: 0,
    front_image: null,
    review: "",
    images: [],
  });

  const [uploadDocument] = useUploadDocumentMutation();
  const [fileList, setFileList] = useState<File[]>([]);
  const navigate = useNavigate();

  const uploadDocuments = (file: any, fieldName: string) => {
    const formData = new FormData();
    formData.append("image", file);
    uploadDocument(formData)
      .unwrap()
      .then((response: any) => {
        setState({ ...state, [fieldName]: response.id });
        formik.setFieldValue(fieldName, response.id);
      });
  };

  const onBeforeUpload = (file: any, fieldName: string) => {
    uploadDocuments(file, fieldName);
    setFileList([...fileList, file]);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      discount_text: "",
      discount: 0,
      slide_image: null,
      slide: true,
      category: "",
      price: 0,
      rates: 0,
      front_image: null,
      review: "",
      images: [],
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // createProduct(values);
      console.log(values);
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitForm = () => {
    formik.setTouched({
      name: true,
      description: true,
    });
    setFormSubmitted(true);
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      }
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (file) {
      onBeforeUpload(file, fieldName);
    }
  };

  const topCategories = ["Electronics", "Books", "Clothing"];

  return (
    <RootContainer>
      <Container>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <InputContainer>
          <TextField
            label="Product Name"
            id="name"
            variant="outlined"
            size="small"
            {...formik.getFieldProps("name")}
            required
            error={formSubmitted && Boolean(formik.errors.name)}
            helperText={formSubmitted ? formik.errors.name : ""}
          />
          <TextField
            label="Description"
            id="description"
            variant="outlined"
            size="small"
            multiline
            rows={3}
            {...formik.getFieldProps("description")}
            required
            error={formSubmitted && Boolean(formik.errors.description)}
            helperText={formSubmitted ? formik.errors.description : ""}
          />
          <TextField
            label="Discount Text"
            id="discount_text"
            variant="outlined"
            size="small"
            {...formik.getFieldProps("discount_text")}
            required
            error={formSubmitted && Boolean(formik.errors.discount_text)}
            helperText={formSubmitted ? formik.errors.discount_text : ""}
          />
          <TextField
            label="Discount"
            id="discount"
            variant="outlined"
            size="small"
            type="number"
            {...formik.getFieldProps("discount")}
            required
            error={formSubmitted && Boolean(formik.errors.discount)}
            helperText={formSubmitted ? formik.errors.discount : ""}
          />
          {state.slide_image === null ? (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ marginTop: 2 }}
            >
              Upload Slide Image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleInputChange(e, "slide_image")}
                accept="image/*"
              />
            </Button>
          ) : (
            <Chip
              label={fileList[0]?.name}
              variant="outlined"
              size="medium"
              sx={{ padding: 2, fontSize: 16, marginTop: 2 }}
            />
          )}
          <TextField
            label="Category"
            id="category"
            variant="outlined"
            size="small"
            {...formik.getFieldProps("category")}
            required
            error={formSubmitted && Boolean(formik.errors.category)}
            helperText={formSubmitted ? formik.errors.category : ""}
          />
          <TextField
            label="Price"
            id="price"
            variant="outlined"
            size="small"
            type="number"
            {...formik.getFieldProps("price")}
            required
            error={formSubmitted && Boolean(formik.errors.price)}
            helperText={formSubmitted ? formik.errors.price : ""}
          />
          <Rating
            name="rates"
            value={formik.values.rates}
            onChange={(event, newValue) => {
              formik.setFieldValue("rates", newValue);
            }}
            max={5}
            sx={{ marginTop: 2 }}
          />
          {state.front_image === null ? (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ marginTop: 2 }}
            >
              Upload Front Image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleInputChange(e, "front_image")}
                accept="image/*"
              />
            </Button>
          ) : (
            <Chip
              label={fileList[1]?.name}
              variant="outlined"
              size="medium"
              sx={{ padding: 2, fontSize: 16, marginTop: 2 }}
            />
          )}
          <TextField
            label="Review"
            id="review"
            variant="outlined"
            size="small"
            multiline
            rows={3}
            {...formik.getFieldProps("review")}
            required
            error={formSubmitted && Boolean(formik.errors.review)}
            helperText={formSubmitted ? formik.errors.review : ""}
          />
          <Autocomplete
            multiple
            id="images"
            size="small"
            options={[]}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Images"
                placeholder="Image IDs"
                error={
                  formSubmitted &&
                  state.images?.length === 0 &&
                  Boolean(formik.errors.images)
                }
                helperText={formSubmitted ? formik.errors.images : ""}
              />
            )}
            value={state.images}
            onChange={(event, value) => {
              setState({ ...state, images: value });
              formik.setFieldValue("images", value);
            }}
          />
          <FormHelperText>
            Add up to 5 images for the product.
          </FormHelperText>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitForm}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </InputContainer>
      </Container>
    </RootContainer>
  );
};

export default ProductForm;
