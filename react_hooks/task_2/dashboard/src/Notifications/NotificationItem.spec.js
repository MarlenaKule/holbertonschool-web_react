import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

describe("NotificationItem Component", () => {

    it("Color is blue when type is default", () => {
        render(<NotificationItem type="default" value="New course available" />);

        const listElement = screen.getByRole("listitem");

        expect(listElement).toHaveStyle({ color: "blue" });
        expect(listElement).toHaveAttribute("data-notification-type", "default");
    });

    it("Color is red when type is urgent", () => {
        render(<NotificationItem type="urgent" value="New resume available" />);

        const listElement = screen.getByRole("listitem");

        expect(listElement).toHaveStyle({ color: "red" });
        expect(listElement).toHaveAttribute("data-notification-type", "urgent");
    });

    it("calls markAsRead when clicked", () => {
        const markAsRead = jest.fn();

        render(
            <NotificationItem
                id={1}
                type="default"
                value="Test notification"
                markAsRead={markAsRead}
            />
        );

        const listItem = screen.getByRole("listitem");

        fireEvent.click(listItem);

        expect(markAsRead).toHaveBeenCalledWith(1);
    });
});