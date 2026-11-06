import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications Component", () => {
    it("renders the notifications title", () => {
        render(<Notifications notifications={[]} displayDrawer={false} />);

        expect(screen.getByText("Your notifications")).toBeInTheDocument();
    });

    it("calls markNotificationAsRead when notification is clicked", () => {
        const notifications = [{ id: 1, type: "default", value: "New course available" }];
        const markNotificationAsRead = jest.fn();

        render(
            <Notifications
                notifications={notifications}
                displayDrawer={true}
                markNotificationAsRead={markNotificationAsRead}
            />
        );

        const listItem = screen.getByText("New course available");
        fireEvent.click(listItem);

        expect(markNotificationAsRead).toHaveBeenCalledWith(1);
    });

    it("does not re-render when props keep the same references", () => {
        const notifications = [{ id: 1, type: "default", value: "Notification 1" }];
        const markNotificationAsRead = jest.fn();
        const { rerender } = render(
            <Notifications notifications={notifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        notifications[0].value = "Updated Notification 1";
        rerender(
            <Notifications notifications={notifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        expect(screen.queryByText("Updated Notification 1")).not.toBeInTheDocument();
        expect(screen.getByText("Notification 1")).toBeInTheDocument();
    });

    it("re-renders when notifications prop changes", () => {
        const notifications = [{ id: 1, type: "default", value: "Notification 1" }];
        const markNotificationAsRead = jest.fn();
        const { rerender } = render(
            <Notifications notifications={notifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        const updatedNotifications = [{ id: 1, type: "default", value: "Updated Notification 1" }];

        rerender(
            <Notifications notifications={updatedNotifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        expect(screen.getByText("Updated Notification 1")).toBeInTheDocument();
    });

    it("re-renders if notifications length changes", () => {
        const notifications = [{ id: 1, type: "default", value: "Notification 1" }];
        const markNotificationAsRead = jest.fn();
        const { rerender } = render(
            <Notifications notifications={notifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        const updatedNotifications = [
            { id: 1, type: "default", value: "Notification 1" },
            { id: 2, type: "urgent", value: "Notification 2" },
        ];

        rerender(
            <Notifications notifications={updatedNotifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        expect(screen.getByText("Notification 2")).toBeInTheDocument();
    });

    it("re-renders when displayDrawer changes", () => {
        const notifications = [{ id: 1, type: "default", value: "Notification 1" }];
        const markNotificationAsRead = jest.fn();
        const { rerender } = render(
            <Notifications notifications={notifications} displayDrawer={false} markNotificationAsRead={markNotificationAsRead} />
        );

        expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();

        rerender(
            <Notifications notifications={notifications} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />
        );

        expect(screen.getByText("Here is the list of notifications")).toBeInTheDocument();
    });

    it("calls handleDisplayDrawer when clicking on menu item", () => {
        const handleDisplayDrawer = jest.fn();
        const markNotificationAsRead = jest.fn();
        render(<Notifications notifications={[]} displayDrawer={false} handleDisplayDrawer={handleDisplayDrawer} markNotificationAsRead={markNotificationAsRead} />);
        const menuItem = screen.getByText("Your notifications");
        fireEvent.click(menuItem);
        expect(handleDisplayDrawer).toHaveBeenCalled();
    });

    it("calls handleHideDrawer when clicking on close button", () => {
        const handleHideDrawer = jest.fn();
        const markNotificationAsRead = jest.fn();
        render(<Notifications notifications={[{ id: 1, type: "default", value: "Test" }]} displayDrawer={true} handleHideDrawer={handleHideDrawer} markNotificationAsRead={markNotificationAsRead} />);
        const button = screen.getByRole("button", { name: /close/i });
        fireEvent.click(button);
        expect(handleHideDrawer).toHaveBeenCalled();
    });

    it("displays 'No new notification for now' when notifications list is empty", () => {
        const markNotificationAsRead = jest.fn();
        render(<Notifications notifications={[]} displayDrawer={true} markNotificationAsRead={markNotificationAsRead} />);
        expect(screen.getByText("No new notification for now")).toBeInTheDocument();
    });
});
