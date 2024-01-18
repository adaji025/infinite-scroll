import { Card, Image, Text } from "@mantine/core";
import { Fragment, useEffect, useRef, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const elementRef = useRef(null);

  function onIntersection(enteries: any) {
    const firstEntry = enteries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [products]);

  async function fetchMoreItems() {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`
    );
    const data: any = await response.json();

    if (data.products.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPage((prevPage) => prevPage + 1);
    }
  }
  return (
    <Fragment>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1350px] px-5 lg:px-10 mx-auto pt-10">
        {products.map((product) => (
          <Card
            shadow="sm"
            padding="xl"
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                h={160}
                alt="No way!"
              />
            </Card.Section>

            <Text fw={500} size="lg" mt="md">
              You&apos;ve won a million dollars in cash!
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
              Please click anywhere on this card to claim your reward, this is
              not a fraud, trust us
            </Text>
          </Card>
        ))}
      </div>
      {hasMore && (
        <div ref={elementRef} className="text-center">
          Load more Item...
        </div>
      )}
    </Fragment>
  );
};

export default ProductList;
