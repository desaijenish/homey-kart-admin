import styled from "@emotion/styled";
import { Card, CardContent, Rating, Typography } from "@mui/material";
import React from "react";
import { useGetCandidateByIdQuery } from "../../../../redux/api/candidate";
import { useParams } from "react-router-dom";
// import { useParams } from "next/navigation";

const RootContainer = styled.div({
  display: "flex",
  padding: "50px",
  gap: 30,
  justifyContent: "center",
});
const Detail = styled.div({
  display: "flex",
  gap: 40,
});

const Title = styled.div({
  display: "flex",
  gap: 10,
  alignItems: "center",
});

const CandidateInfo = () => {
  const params = useParams();
  const { data: data } = useGetCandidateByIdQuery(params.id as string);
  const englishProficiency = data?.english_proficiency;
  let image = "";
  if (data?.static_file_path) {
    image = `${process.env.REACT_APP_BaseURL}${data?.static_file_path}`;
  }

  return (
    <RootContainer>
      <Card sx={{ p: 4 }}>
        <Typography
          variant="h5"
          component="div"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: " 20px 0px",
          }}
        >
          Candidate Detail
        </Typography>
        <CardContent
          sx={{ pr: 10, display: "flex", gap: 5, flexDirection: "column" }}
        >
          <Detail>
            <Title>
              <Typography sx={{ fontSize: 20 }}>First Name:</Typography>
              <Typography color="text.secondary">{data?.first_name}</Typography>
            </Title>
            <Title>
              <Typography sx={{ fontSize: 20 }}>Last Name:</Typography>
              <Typography color="text.secondary">{data?.last_name}</Typography>
            </Title>
          </Detail>
          <Title>
            <Typography sx={{ fontSize: 20 }}>Phone Number:</Typography>
            <Typography color="text.secondary">{data?.phone}</Typography>
          </Title>
          <Title>
            <Typography sx={{ fontSize: 20 }}>Email:</Typography>
            <Typography color="text.secondary">{data?.email}</Typography>
          </Title>
          <Title>
            <Typography sx={{ fontSize: 20 }}>Address:</Typography>
            <Typography color="text.secondary">{data?.addr}</Typography>
          </Title>
          <Detail>
            <Title>
              <Typography sx={{ fontSize: 20 }}>City:</Typography>
              <Typography color="text.secondary">{data?.city}</Typography>
            </Title>
            <Title>
              <Typography sx={{ fontSize: 20 }}>State:</Typography>
              <Typography color="text.secondary">{data?.state}</Typography>
            </Title>
          </Detail>
          <Title>
            <Typography sx={{ fontSize: 20 }}>Skill:</Typography>
            <Typography color="text.secondary">{data?.skill}</Typography>
          </Title>
          <Title>
            <Typography sx={{ fontSize: 20 }}>English proficiency:</Typography>
            <Rating
              name="read-only"
              value={englishProficiency !== undefined ? englishProficiency : 0}
              readOnly
            />
          </Title>
          <Title>
            <Typography sx={{ fontSize: 20 }}>Last Education:</Typography>
            <Typography color="text.secondary">
              {data?.last_education}
            </Typography>
          </Title>
        </CardContent>
      </Card>
      <iframe src={image} width={"30%"} height={700} />
    </RootContainer>
  );
};

export default CandidateInfo;
