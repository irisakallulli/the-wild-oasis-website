import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadate = {
  title: "Reservations ",
};

export default async function Page() {
  try {
    const session = await auth();

    // Check if session and user are correctly defined
    if (!session || !session.user || !session.user.guestId) {
      throw new Error("Invalid session or guest ID");
    }

    const guestId = session.user.guestId; // Ensure guestId is accessed correctly
    const bookings = await getBookings(guestId);

    // Display the no reservations message if bookings are empty
    if (bookings.length === 0) {
      return (
        <div>
          <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Your reservations
          </h2>
          <p className="text-lg">
            You have no reservations yet. Check out our{" "}
            <a className="underline text-accent-500" href="/cabins">
              luxury cabins &rarr;
            </a>
          </p>
        </div>
      );
    }

    // Display bookings if they exist
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Your reservations
        </h2>
        <ReservationList bookingg={bookings} />
      </div>
    );
  } catch (error) {
    console.error("Error loading bookings:", error);
    // Handle the error, possibly by showing the no reservations message
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Your reservations
        </h2>
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      </div>
    );
  }
}
