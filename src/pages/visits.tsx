import { Plus } from "lucide-react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "~/components/loading";
import NewVisitForm from "~/components/new_visit";
import VisitsList from "~/components/visits";
import { ITEMS_PER_PAGE, type Visit } from "~/utils";

const Visits: NextPage = () => {
  const [isUserAddingVisit, setIsUserAddingVisit] = useState<boolean>(false);

  const [visits, setVisits] = useState<Visit[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && isNextPageAvailable) {
      setIsLoading(true);
    }
  }, [isNextPageAvailable, inView]);

  useEffect(() => {
    if (!isLoading || !isNextPageAvailable) {
      return;
    }

    const controller = new AbortController();

    const fetchUsers = async (page: number) => {
      const res = await fetch(
        `http://localhost:3001/database/my_visits?page=${page}`,
        {
          credentials: "include",
          signal: controller.signal,
        }
      );

      if (res.ok) {
        const { data, meta } = (await res.json()) as {
          data: Visit[];
          meta: { page: string };
        };

        setIsLoading(false);
        setPageNumber(+meta.page + 1);
        setIsNextPageAvailable(data.length === ITEMS_PER_PAGE);
        setVisits((old) =>
          old
            ? [...old.slice(0, (+meta.page - 1) * ITEMS_PER_PAGE), ...data]
            : data
        );
      }
    };

    fetchUsers(pageNumber).catch((e) => {
      console.error(e);
    });

    return () => controller.abort();
  }, [isLoading, inView, pageNumber, isNextPageAvailable]);

  return (
    <>
      {isUserAddingVisit && (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-40">
          <NewVisitForm
            className="z-20"
            onClose={() => setIsUserAddingVisit(false)}
            onSuccess={() => {
              setIsUserAddingVisit(false);
              setIsLoading(true);
            }}
          ></NewVisitForm>
        </div>
      )}
      <div className="flex h-16 items-center px-10">
        <button
          className="flex items-center justify-center gap-1 rounded-xl bg-blue-400 px-3.5 py-2"
          onClick={() => {
            setIsUserAddingVisit(true);
          }}
        >
          Dodaj wizytę <Plus></Plus>
        </button>
      </div>
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-green-300">
        {!visits && isLoading ? (
          <Loading></Loading>
        ) : (
          <VisitsList visits={visits} ref={ref}></VisitsList>
        )}
      </div>
    </>
  );
};

export default Visits;
