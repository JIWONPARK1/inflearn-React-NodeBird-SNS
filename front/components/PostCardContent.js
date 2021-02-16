import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((hash, index) => {
        if (hash.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${hash.slice(1)}`} key={index}>
              <a>{hash}</a>
            </Link>
          );
        }
        return hash;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
