import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "../UIkit";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
  },
  checkIcon: {
    float: "right",
  },
});

const SetSizesArea = (props) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === "") {
      // Required input is blank.
      return false;
    } else {
      if (index === props.sizes.length) {
        // 現在のsizes.lengthがindexが新規追加の時は一致する
        // 前回までのStateを受け取って、引数で受け取った値を新たに追加する
        props.setSizes((prevState) => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize("");
        setQuantity(0);
      } else {
        // ローカルのindexがeditSizeによって変更された時は既存のサイズの編集
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity }; // このsize,quantityはaddSizeの引数で渡ってきたsize, quantity
        props.setSizes(newSizes);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
    // 引数で渡ってきた値を現在のStateにセットするだけ
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex); // deleteIndex以外の配列の要素を返す
    props.setSizes(newSizes);
  };

  // const memoIndex = useMemo(() => {
  //   // props.sizes.lengthが変わった時にindexを更新する
  //   // indexの初期値は0だが、編集の場合はindexが既にある。そのindexから始めるため
  //   setIndex(props.sizes.length);
  // }, [props.sizes.length]);

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {/* <TableRow> */}
            <TableCell>サイズ</TableCell>
            <TableCell>数量</TableCell>
            <TableCell className={classes.iconCell} />
            <TableCell className={classes.iconCell} />
            {/* </TableRow> */}
          </TableHead>
          <TableBody>
            {props.sizes?.length > 0
              ? props.sizes.map((item, i) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => editSize(i, item.size, item.quantity)} // propsで受け取ったsizesをmapで回してそのプロパティをローカルのStateにセットする
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => deleteSize(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullwidth={false}
            label={"サイズ"}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={"text"}
          />
          <TextInput
            fullwidth={false}
            label={"数量"}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={"number"}
          />
          <IconButton
            className={classes.checkIcon}
            onClick={() => addSize(index, size, quantity)}
          >
            <CheckCircleIcon />
          </IconButton>
        </div>
      </TableContainer>
    </div>
  );
};

export default SetSizesArea;
