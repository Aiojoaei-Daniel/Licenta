// import React from "react";
import _ from "lodash";

const PostTypes = (props) => {
  const year1 = _.range(5101, 5121);
  const year2 = _.range(5201, 5221);
  const year3 = _.range(5301, 5321);
  const year4 = _.range(5401, 5421);
  const years = [...year1, ...year2, ...year3, ...year4];
  const types = [
    ["All"],
    ["College"],
    ["Specializations", ["EA", "MON", "TST"]],
    ["Groups", years],
  ];

  const typesForInputGroupSelect = ["College", "EA", "MON", "TST", ...years];

  return { types, typesForInputGroupSelect };
};

export default PostTypes;
