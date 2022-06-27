import _ from "lodash";

const postsType = () => {
  const year1 = _.range(5101, 5121);
  const year2 = _.range(5201, 5221);
  const year3 = _.range(5301, 5321);
  const year4 = _.range(5401, 5421);
  const years = [...year1, ...year2, ...year3, ...year4];

  const specializations = ["Fără specializare", "EA", "MON", "TST"];

  // for category section
  const categories = [
    ["Toate"],
    ["Universitate"],
    ["Specializare", ["EA", "MON", "TST"]],
    ["Grupe", years],
  ];

  // for post form
  const postType = ["Universitate", "EA", "MON", "TST", ...years];

  return { categories, postType, specializations, years };
};

export default postsType;
