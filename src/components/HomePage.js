import { useState, useEffect } from "react";
import {
  Menu,
  Button,
  Card,
  Icon,
  ListItem,
  ListHeader,
  ListDescription,
  ListContent,
  List,
  Image,
} from "semantic-ui-react";
import { notification, Carousel, Badge, Drawer } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#4682B4",
};

function HomePage() {
  let [contProd, setContProd] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  let [carrinho, setCarrinho] = useState([]);
  let [item, setItem] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const showCart = () => {
    setOpenCart(true);
    setContProd(0);
    console.log(carrinho.length);
  };
  const onClose = () => {
    setOpenCart(false);
  };

  const addToCart = (item) => {
    notification.open({
      message: "Adicionado com sucesso",
      description: "Seu item foi adicionado ao carrinho",
      duration: 0.75,
    });
    setContProd(contProd + 1);
    setCarrinho([...carrinho, item]);
  };

  const deletToCart = () => {
    setCarrinho([]);
  };

  function CarrinhoCompras() {
    return (
      <div>
        {carrinho.length === 0 ? (
          <h3>Sua sacola está vazia</h3>
        ) : (
          <div>
            <List>
              {carrinho.map((item, index) => (
                <ListItem key={index}>
                  <Image avatar src={item.image} />
                  <ListContent>
                    <ListHeader>{`R$ ${item.price}`}</ListHeader>
                    <ListDescription>
                      {item.title.slice(0, 28) + "..."}
                    </ListDescription>
                  </ListContent>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <br />
        <Button onClick={deletToCart}>Limpar sacola</Button>
        {carrinho.length > 0 ? (
          <Button
            primary
            onClick={() => alert("Final do trajeto até agora...")}
          >
            Finalizar compra
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Menu
        size="small"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
      >
        <Menu.Item name="LOJA" active="true" />

        <Menu.Menu position="right">
          <Menu.Item>
            <Badge count={contProd}>
              <Button
                primary
                icon={{ name: "shopping cart" }}
                onClick={showCart}
              ></Button>
            </Badge>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Drawer
        title="Finalize sua compra"
        placement="right"
        onClose={onClose}
        open={openCart}
        size={"default"}
      >
        <CarrinhoCompras />
      </Drawer>

      <Carousel autoplay autoplayspeed={1000}>
        <div>
          <h3 style={contentStyle}>Banner 1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Banner 2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Banner 3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Banner 4</h3>
        </div>
      </Carousel>
      <br />
      <div id="cardGroup">
        <Card.Group>
          {item.map((itens) => (
            <Card key={itens.id}>
              <h3>
                <img src={itens.image} width="30%" height="100%" />
              </h3>
              <Card.Content>
                <Card.Header>{itens.title}</Card.Header>
                <Card.Description>
                  {itens.description.slice(0, 50) + "..."}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                R${itens.price}
                <br />
                <Button animated="vertical" onClick={() => addToCart(itens)}>
                  <Button.Content visible>Adicionar ao carrinho</Button.Content>
                  <Button.Content hidden>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    </div>
  );
}

export default HomePage;
