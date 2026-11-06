import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

describe("NotificationItem Component", () => {
    const renderNotificationItem = (props) =>
        render(
            <ul>
                <NotificationItem {...props} />
            </ul>
        );

    it("Color is blue when type is default", () => {
        renderNotificationItem({
            type: "default",
            value: "New course available",
        });

        const listElement = screen.getByRole("listitem");

        expect(listElement).toHaveStyle({ color: "blue" });
        expect(listElement).toHaveAttribute("data-notification-type", "default");
    });

    it("Color is red when type is urgent", () => {
        renderNotificationItem({
            type: "urgent",
            value: "New resume available",
        });

        const listElement = screen.getByRole("listitem");

        expect(listElement).toHaveStyle({ color: "red" });
        expect(listElement).toHaveAttribute("data-notification-type", "urgent");
    });

    it("calls markAsRead when clicked", () => {
        const markAsRead = jest.fn();

        renderNotificationItem({
            id: 1,
            type: "default",
            value: "Test notification",
            markAsRead,
        });

        const listItem = screen.getByRole("listitem");

        fireEvent.click(listItem);

        expect(markAsRead).toHaveBeenCalledWith(1);
    });

    it("does not re-render when props keep the same references", () => {
        const html = { __html: "Notification 1" };
        const markAsRead = jest.fn();
        const { rerender } = render(
            <ul>
                <NotificationItem
                    id={1}
                    type="urgent"
                    html={html}
                    markAsRead={markAsRead}
                />
            </ul>
        );

        html.__html = "Updated Notification 1";
        rerender(
            <ul>
                <NotificationItem
                    id={1}
                    type="urgent"
                    html={html}
                    markAsRead={markAsRead}
                />
            </ul>
        );

        expect(screen.queryByText("Updated Notification 1")).not.toBeInTheDocument();
        expect(screen.getByText("Notification 1")).toBeInTheDocument();
    });

    it("re-renders when a prop reference changes", () => {
        const markAsRead = jest.fn();
        const { rerender } = render(
            <ul>
                <NotificationItem
                    id={1}
                    type="urgent"
                    html={{ __html: "Notification 1" }}
                    markAsRead={markAsRead}
                />
            </ul>
        );

        rerender(
            <ul>
                <NotificationItem
                    id={1}
                    type="urgent"
                    html={{ __html: "Updated Notification 1" }}
                    markAsRead={markAsRead}
                />
            </ul>
        );

        expect(screen.getByText("Updated Notification 1")).toBeInTheDocument();
    });
});
