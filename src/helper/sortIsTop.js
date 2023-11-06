export const sortIsTop = (data) => {
    let temp = [...data];
    console.log(temp.filter((item) => item.isTopOfTheWeek === true))
    return temp.filter((item) => item.isTopOfTheWeek === true);
}