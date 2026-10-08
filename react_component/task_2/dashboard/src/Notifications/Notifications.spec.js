import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications Component", () => {

    it("logs message when notification is clicked", () => {

        const notifications = [
            { id: 1, type: "default", value: "New course available" },
        ];

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        render(
            <Notifications notifications={notifications} displayDrawer={true} />
        );

        const listItem = screen.getByText("New course available");

        fireEvent.click(listItem);

        expect(consoleSpy).toHaveBeenCalledWith(
            "Notification 1 has been marked as read"
        );

        consoleSpy.mockRestore();
    });

});