class MyMenuManager {

    constructor(id, notificationCenter, keyboardManager) {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;

        this.initialize();
        this.registerForNotifications();
    }

    registerForNotifications() {

        this.notificationCenter.register(
            NotificationType.Menu,
            this,
            this.handleMenuNotification
        );
    }

    handleMenuNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.ShowMenuChanged:

                this.showMenu(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
    }

    showMenu(statusType) {

        // If we created an event to tell the ObjectManager to draw and update,
        // then it means we want the game to run i.e. hide the menu
        if (statusType != 0) {
            $('#main').hide();
            $('#menu').removeClass('main');
        }
        else {
            $('#main').show();
            $('#menu').addClass('main');
        }
    }

    initialize() {

        // Show the wrapper that encloses our menu and canvas - if we dont show the wrapper 
        // then we will see a blank area only
        $('.wrapper').show();

        // If the play button is clicked
        $('.play').click(function () {

            // Hide the menu
            $('#menu').hide();

            // Send a notification to update and draw the game
            notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.ShowMenuChanged,
                    [StatusType.Updated | StatusType.Drawn]
                )
            );
        });

        // If the exit button is clicked
        $('.exit').click(function () {

            // Do something?
            // Hide the menu?
            // Open exit menu?
        });
    }

    update(gameTime) {

        // TO DO: Add code to listen for a 'pause key' press, and show/hide the menu accordingly
    }
}